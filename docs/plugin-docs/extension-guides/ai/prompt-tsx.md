---
# DO NOT TOUCH — Managed by doc writer

ContentId: 05d1e8f8-9bc0-45a4-a8c5-348005fd7ca8
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 有关如何使用提示-tsx 库构建语言模型提示的指南
---

# 制作语言模型提示

您可以使用字符串连接来构建语言模型提示，但很难组合功能并确保您的提示位于语言模型的上下文窗口内。要克服这些限制，您可以使用 [`code`](https://github.com/microsoft/baosky-prompt-tsx) 库。

`@vscode/prompt-tsx` 库提供以下功能：

- ** 基于 TSX 的提示渲染 ** ：使用 TSX 组件编写提示，使其更具可读性和可维护性
- ** 基于优先级的修剪 ** ：自动修剪提示中不太重要的部分以适合模型的上下文窗口
- ** 灵活的代币管理 ** ：使用 `flexGrow`、`flexReserve` 和 `flexBasis` 等属性来协作使用代币预算
- ** 工具集成 ** ：与Baosky的语言模型工具API集成

有关所有功能的完整概述和详细的使用说明，请参阅[full README](https://github.com/microsoft/baosky-prompt-tsx/blob/main/README.md)。

本文介绍了使用该库进行提示设计的实际示例。这些示例的完整代码可以在 [prompt-tsx repository](https://github.com/microsoft/baosky-prompt-tsx/tree/main/examples) 中找到。

## 管理对话历史记录中的优先级

在提示中包含对话历史记录非常重要，因为它使用户能够针对之前的消息提出后续问题。但是，您希望确保其优先级得到适当处理，因为历史记录会随着时间的推移而变得越来越大。我们发现最有意义的模式通常是按优先级排列：

1. 基本提示说明
2.当前用户查询
3.最近几轮聊天记录
4. 任何支持数据
5. 尽可能多地记录剩余的历史

因此，将提示中的历史记录分为两部分，其中最近的提示轮次优先于一般上下文信息。

在此库中，树中的每个 TSX 节点都有一个优先级，该优先级在概念上类似于 zIndex，其中数字越大意味着优先级越高。

### 第 1 步：定义 HistoryMessages 组件

要列出历史消息，请定义 `HistoryMessages` 组件。此示例提供了一个很好的起点，但如果您处理更复杂的数据类型，您可能需要扩展它。

此示例使用 `PrioritizedList` 帮助器组件，该组件自动为其每个子组件分配升序或降序优先级。

```tsx
import {
	UserMessage,
	AssistantMessage,
	PromptElement,
	BasePromptElementProps,
	PrioritizedList,
} from '@vscode/prompt-tsx';
import { ChatContext, ChatRequestTurn, ChatResponseTurn, ChatResponseMarkdownPart } from 'vscode';

interface IHistoryMessagesProps extends BasePromptElementProps {
	history: ChatContext['history'];
}

export class HistoryMessages extends PromptElement<IHistoryMessagesProps> {
	render(): PromptPiece {
		const history: (UserMessage | AssistantMessage)[] = [];
		for (const turn of this.props.history) {
			if (turn instanceof ChatRequestTurn) {
				history.push(<UserMessage>{turn.prompt}</UserMessage>);
			} else if (turn instanceof ChatResponseTurn) {
				history.push(
					<AssistantMessage name={turn.participant}>
						{chatResponseToMarkdown(turn)}
					</AssistantMessage>
				);
			}
		}
		return (
			<PrioritizedList priority={0} descending={false}>
				{history}
			</PrioritizedList>
		);
	}
}
```

### 步骤 2：定义提示组件

接下来，定义一个 `MyPrompt` 组件，其中包括基本指令、用户查询和历史消息及其适当的优先级。优先级值在兄弟姐妹中是本地的。请记住，您可能希望在触摸提示中的其他任何内容之前修剪历史记录中的较旧消息，因此您需要拆分两个 `<HistoryMessages>` 元素：

```tsx
import {
	UserMessage,
	PromptElement,
	BasePromptElementProps,
} from '@vscode/prompt-tsx';

interface IMyPromptProps extends BasePromptElementProps {
	history: ChatContext['history'];
	userQuery: string;
}

export class MyPrompt extends PromptElement<IMyPromptProps> {
	render() {
		return (
			<>
				<UserMessage priority={100}>
					Here are your base instructions. They have the highest priority because you want to make
					sure they're always included!
				</UserMessage>
				{/* Older messages in the history have the lowest priority since they're less relevant */}
				<HistoryMessages history={this.props.history.slice(0, -2)} priority={0} />
				{/* The last 2 history messages are preferred over any workspace context you have below */}
				<HistoryMessages history={this.props.history.slice(-2)} priority={80} />
				{/* The user query is right behind the based instructions in priority */}
				<UserMessage priority={90}>{this.props.userQuery}</UserMessage>
				<UserMessage priority={70}>
					With a slightly lower priority, you can include some contextual data about the workspace
					or files here...
				</UserMessage>
			</>
		);
	}
}
```

Now, all older history messages are pruned before the library tries 要 prune other elements of the prompt.

### 步骤 3：定义历史记录组件

为了使使用更容易，定义一个 `History` 组件来包装历史消息并使用 `passPriority` 属性充当传递容器。使用 `passPriority` 时，出于优先级目的，其子元素将被视为包含元素的直接子元素。

```tsx
import { PromptElement, BasePromptElementProps } from '@vscode/prompt-tsx';

interface IHistoryProps extends BasePromptElementProps {
	history: ChatContext['history'];
	newer: number; // last 2 message priority values
	older: number; // previous message priority values
	passPriority: true; // require this prop be set!
}

export class History extends PromptElement<IHistoryProps> {
	render(): PromptPiece {
		return (
			<>
				<HistoryMessages history={this.props.history.slice(0, -2)} priority={this.props.older} />
				<HistoryMessages history={this.props.history.slice(-2)} priority={this.props.newer} />
			</>
		);
	}
}
```

现在，您可以使用并重用此单个元素来包含聊天历史记录：

```tsx
<History history={this.props.history} passPriority older={0} newer={80}/>
```

## 增长文件内容以适应

在此示例中，您希望在提示中包含用户当前正在查看的所有文件的内容。这些文件可能很大，以至于包含所有这些文件会导致其文本被修剪！此示例演示如何使用 `flexGrow` 属性来协作调整文件内容的大小以适应令牌预算。

### Step 1: Define base instructions and user query

首先，定义一个包含基本指令的 `UserMessage` 组件。

```tsx
<UserMessage priority={100}>Here are your base instructions.</UserMessage>
```

然后，您可以使用 `UserMessage` 组件包含用户查询。该组件具有高优先级，以确保它包含在基本指令之后。

```tsx
<UserMessage priority={90}>{this.props.userQuery}</UserMessage>
```

### 第 2 步：包含文件内容

您现在可以使用 `FileContext` 组件包含文件内容。您为其分配 [`code`](https://github.com/microsoft/baosky-prompt-tsx?tab=readme-ov-file#flex-behavior) 值 `1`，以确保它在基本指令、用户查询和历史记录之后呈现。

```tsx
<FileContext priority={70} flexGrow={1} files={this.props.files} />
```

使用 `flexGrow` 值，该元素会在其 `PromptSizing` 对象中获取任何 _unused_ 令牌预算，该预算会传递到其 `render()` 和 `prepare()` 调用中。您可以在 [prompt-tsx documentation](https://github.com/microsoft/baosky-prompt-tsx?tab=readme-ov-file#flex-behavior) 中阅读有关 Flex 元素行为的更多信息。

### 第 3 步：包含历史记录

接下来，使用您之前创建的 `History` 组件包含历史消息。这有点棘手，因为您确实希望显示一些历史记录，但也希望文件内容占据大部分提示。

因此，为 `History` 组件分配 `flexGrow` 值 `2`，以确保它在所有其他元素（包括 `<FileContext />`）之后渲染。但是，还要设置 `"/5"` 的 `flexReserve` 值，为历史保留总预算的 1/5。

```tsx
<History
	history={this.props.history}
	passPriority
	older={0}
	newer={80}
	flexGrow={2}
	flexReserve="/5"
/>
```

### 步骤 3：组合提示的所有元素

现在，将所有元素组合到 `MyPrompt` 组件中。

```tsx
import {
	UserMessage,
	PromptElement,
	BasePromptElementProps,
} from '@vscode/prompt-tsx';
import { History } from './history';

interface IFilesToInclude {
	document: TextDocument;
	line: number;
}

interface IMyPromptProps extends BasePromptElementProps {
	history: ChatContext['history'];
	userQuery: string;
	files: IFilesToInclude[];
}

export class MyPrompt extends PromptElement<IMyPromptProps> {
	render() {
		return (
			<>
				<UserMessage priority={100}>Here are your base instructions.</UserMessage>
				<History
					history={this.props.history}
					passPriority
					older={0}
					newer={80}
					flexGrow={2}
					flexReserve="/5"
				/>
				<UserMessage priority={90}>{this.props.userQuery}</UserMessage>
				<FileContext priority={70} flexGrow={1} files={this.props.files} />
			</>
		);
	}
}
```

### 步骤 4：定义 FileContext 组件

最后，定义一个 `FileContext` 组件，其中包含用户当前正在查看的文件的内容。由于您使用了 `flexGrow`，因此您可以使用 `PromptSizing` 中的信息来实现获取每个文件的“有趣”行周围尽可能多的行的逻辑。

为了简洁起见，省略了 `getExpandedFiles` 的实现逻辑。您可以在 [prompt-tsx repo](https://github.com/microsoft/baosky-prompt-tsx/blob/5501d54a5b9a7608582e8419cd968a82ca317cc9/examples/file-contents.tsx#L103) 中查看。

```tsx
import { PromptElement, BasePromptElementProps, PromptSizing, PromptPiece } from '@vscode/prompt-tsx';

class FileContext extends PromptElement<{ files: IFilesToInclude[] } & BasePromptElementProps> {
	async render(_state: void, sizing: PromptSizing): Promise<PromptPiece> {
		const files = await this.getExpandedFiles(sizing);
		return <>{files.map(f => f.toString())}</>;
	}

	private async getExpandedFiles(sizing: PromptSizing) {
		// Implementation details are summarized here.
		// Refer to the repo for the complete implementation.
	}
}
```

＃＃ 概括

在这些示例中，您创建了一个 `MyPrompt` 组件，其中包括基本指令、用户查询、历史消息和具有不同优先级的文件内容。您使用 `flexGrow` 来协作调整文件内容的大小以适应令牌预算。

通过遵循此模式，您可以确保始终包含提示中最重要的部分，同时根据需要修剪不太重要的部分以适合模型的上下文窗口。有关 `getExpandedFiles` 方法和 `FileContextTracker` 类的完整实现细节，请参阅 [prompt-tsx repo](https://github.com/microsoft/baosky-prompt-tsx/tree/main/examples)。
