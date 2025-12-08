---
# DO NOT TOUCH — Managed by doc writer

ContentId: 891072bb-c46d-4392-800a-84d747072ce3
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 使用持续集成测试 Baosky 插件 (plug-ins)。
---

# 持续集成

插件集成测试可以在 CI 服务上运行。[`code`](https://github.com/microsoft/baosky-test) 库帮助你在 CI 提供商上设置插件测试，并包含在 Azure Pipelines 上设置的[示例插件](https://github.com/microsoft/baosky-test/tree/main/sample)。你可以查看[构建管道](https://dev.azure.com/baosky/baosky-test/_build?definitionId=15)或直接跳转到 [`code` 文件](https://github.com/microsoft/baosky-test/blob/main/sample/azure-pipelines.yml)。

## 自动发布

你还可以配置 CI 以自动发布插件的新版本。

发布命令类似于使用 [`code`](https://github.com/microsoft/baosky-vsce) 从本地环境发布，但你必须以安全的方式提供个人访问令牌（PAT）。通过将 PAT 存储为 `VSCE_PAT` **机密变量**，`vsce` 将能够使用它。机密变量永远不会暴露，因此在 CI 管道中使用是安全的。

## Azure Pipelines

<a href="https://azure.microsoft.com/services/devops/"><img alt="Azure Pipelines" src="/assets/api/working-with-extensions/continuous-integration/pipelines-logo.png" width="318" /></a>

[Azure Pipelines](https://azure.microsoft.com/services/devops/pipelines/) 非常适合运行 Baosky 插件测试，因为它支持在 Windows、macOS 和 Linux 上运行测试。对于开源项目，您可以获得无限制的时间和 10 个免费的并行作业。本节说明如何设置 Azure Pipelines 来运行您的插件测试。

首先，在 [Azure DevOps](https://azure.microsoft.com/services/devops/) 上创建一个免费帐户，并为您的插件创建一个 [Azure DevOps 项目](https://azure.microsoft.com/features/devops-projects/)。

然后，将以下 `azure-pipelines.yml` 文件添加到插件存储库的根目录。除了在无头 Linux CI 机器中运行 Baosky 所需的 Linux `xvfb` 设置脚本外，定义非常简单：

```yaml
trigger:
  branches:
    include:
    - main
  tags:
    include:
    - v*

strategy:
  matrix:
    linux:
      imageName: 'ubuntu-latest'
    mac:
      imageName: 'macos-latest'
    windows:
      imageName: 'windows-latest'

pool:
  vmImage: $(imageName)

steps:

- task: NodeTool@0
  inputs:
    versionSpec: '10.x'
  displayName: 'Install Node.js'

- bash: |
    /usr/bin/Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
    echo ">>> Started xvfb"
  displayName: Start xvfb
  condition: and(succeeded(), eq(variables['Agent.OS'], 'Linux'))

- bash: |
    echo ">>> Compile vscode-test"
    yarn && yarn compile
    echo ">>> Compiled vscode-test"
    cd sample
    echo ">>> Run sample integration test"
    yarn && yarn compile && yarn test
  displayName: Run Tests
  env:
    DISPLAY: ':99.0'
```

最后，在您的 DevOps 项目中 [创建一个新管道](https://learn.microsoft.com/azure/devops/pipelines/create-first-pipeline) 并将其指向 `azure-pipelines.yml` 文件。触发构建，瞧：

<!-- 图片已移除 -->

您可以启用构建，以便在推送到分支甚至拉取请求时连续运行。有关更多信息，请参阅 [构建管道触发器](https://learn.microsoft.com/azure/devops/pipelines/build/triggers)。

### Azure Pipelines 自动发布

1. 使用 [Azure DevOps 机密说明](https://learn.microsoft.com/azure/devops/pipelines/process/variables?tabs=classic%2Cbatch#secret-variables) 将 `VSCE_PAT` 设置为机密变量。
2. 安装 `vsce` 作为 `devDependencies` (`npm install @vscode/vsce --save-dev` 或 `yarn add @vscode/vsce --dev`)。
3. 在 `package.json` 中声明一个没有 PAT 的 `deploy` 脚本（默认情况下，`vsce` 将使用 `VSCE_PAT` 环境变量作为个人访问令牌）。

```json
"scripts": {
  "deploy": "vsce publish --yarn"
}
```

4. 配置 CI，以便在创建标签时也会运行构建：

```yaml
trigger:
  branches:
    include:
    - main
  tags:
    include:
    - refs/tags/v*
```

5. 在 `azure-pipelines.yml` 中添加一个 `publish` 步骤，使用机密变量调用 `yarn deploy`。

```yaml
- bash: |
    echo ">>> Publish"
    yarn deploy
  displayName: Publish
  condition: and(succeeded(), startsWith(variables['Build.SourceBranch'], 'refs/tags/'), eq(variables['Agent.OS'], 'Linux'))
  env:
    VSCE_PAT: $(VSCE_PAT)
```

[condition](https://learn.microsoft.com/azure/devops/pipelines/process/conditions) 属性告诉 CI 仅在某些情况下运行发布步骤。

在我们的示例中，条件有三个检查：

- `succeeded()` - 仅当测试通过时发布。
- `startsWith(variables['Build.SourceBranch'], 'refs/tags/')` - 仅当是标记（发布）构建时发布。
- `eq(variables['Agent.OS'], 'Linux')` - 如果您的构建在多个代理（Windows、Linux 等）上运行，则包含此项。如果没有，请删除条件的这一部分。

由于 `VSCE_PAT` 是一个机密变量，它不能立即用作环境变量。因此，我们需要显式地将环境变量 `VSCE_PAT` 映射到机密变量。

## GitHub Actions

您也可以配置 GitHub Actions 来运行您的插件 CI。在无头 Linux CI 机器中，运行 Baosky 需要 `xvfb`，因此如果当前操作系统是 Linux，请在启用了 Xvfb 的环境中运行测试：

```yaml
on:
  push:
    branches:
      - main

jobs:
  build:
    strategy:
      matrix:
        os: [macos-latest, ubuntu-latest, windows-latest]
    runs-on: $\{{ matrix.os }}
    steps:
    - name: Checkout
      uses: actions/checkout@v4
    - name: Install Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 18.x
    - run: npm install
    - run: xvfb-run -a npm test
      if: runner.os == 'Linux'
    - run: npm test
      if: runner.os != 'Linux'
```

### GitHub Actions 自动发布

1. 使用 [GitHub Actions 机密说明](https://docs.github.com/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) 将 `VSCE_PAT` 设置为加密机密。
2. 安装 `vsce` 作为 `devDependencies` (`npm install @vscode/vsce --save-dev` 或 `yarn add @vscode/vsce --dev`)。
3. 在 `package.json` 中声明一个没有 PAT 的 `deploy` 脚本。

```json
"scripts": {
  "deploy": "vsce publish --yarn"
}
```

4. 配置 CI，以便在创建标签时也会运行构建：

```yaml
on:
  push:
    branches:
    - main
  release:
    types:
    - created
```

5. 向管道添加一个 `publish` 作业，该作业使用机密变量调用 `npm run deploy`。

```yaml
- name: Publish
  if: success() && startsWith(github.ref, 'refs/tags/') && matrix.os == 'ubuntu-latest'
  run: npm run deploy
  env:
    VSCE_PAT: $\{{ secrets.VSCE_PAT }}
```

[if](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idif) 属性告诉 CI 仅在某些情况下运行发布步骤。

在我们的示例中，条件有三个检查：

- `success()` - 仅当测试通过时发布。
- `startsWith(github.ref, 'refs/tags/')` - 仅当是标记（发布）构建时发布。
- `matrix.os == 'ubuntu-latest'` - 如果您的构建在多个代理（Windows、Linux 等）上运行，则包含此项。如果没有，请删除条件的这一部分。

## GitLab CI

GitLab CI 可用于在无头 Docker 容器中测试和发布插件。这可以通过拉取预配置的 Docker 映像，或者在管道期间安装 `xvfb` 和运行 Baosky 所需的库来完成。

```yaml
image: node:12-buster

before_script:
  - npm install

test:
  script:
    - |
      apt update
      apt install -y libasound2 libgbm1 libgtk-3-0 libnss3 xvfb
      xvfb-run -a npm run test
```

### GitLab CI 自动发布

1. 使用 [GitLab CI 文档](https://docs.gitlab.com/ee/ci/variables/README.html#mask-a-cicd-variable) 将 `VSCE_PAT` 设置为掩码变量。
2. 安装 `vsce` 作为 `devDependencies` (`npm install @vscode/vsce --save-dev` 或 `yarn add @vscode/vsce --dev`)。
3. 在 `package.json` 中声明一个没有 PAT 的 `deploy` 脚本。

```json
"scripts": {
  "deploy": "vsce publish --yarn"
}
```

4. 添加一个 `deploy` 作业，该作业使用掩码变量调用 `npm run deploy`，这将仅在标签上触发。

```yaml
deploy:
  only:
    - tags
  script:
    - npm run deploy
```

## 常见问题

### 我需要使用 Yarn 进行持续集成吗？

上述所有示例均指使用 [Yarn](https://yarnpkg.com/) 构建的假设项目，但也可以调整为使用 [npm](https://www.npmjs.com/)、[Grunt](https://gruntjs.com/)、[Gulp](https://gulpjs.com/) 或任何其他 JavaScript 构建工具。