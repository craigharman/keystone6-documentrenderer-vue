<script>
import { Fragment } from 'vue-fragment'

export const block = {
		components: {
			Fragment
		},
		props: {
			block: {
				type: Object,
				required: true,
			},
		},
		mount: function() {

		},
		render: function (h) {
			let node = this.block;
			const renderers = {
				inline: {
					bold: "strong",
					code: "code",
					keyboard: "kbd",
					strikethrough: "s",
					italic: "em",
					link: "a",
					subscript: "sub",
					superscript: "sup",
					underline: "u"
				}
			};

			if (typeof node.text === "string") {
				let child = <Fragment>{node.text}</Fragment>;
				Object.keys(renderers.inline).forEach((markName) => {
					if (
						markName !== "link" &&
						markName !== "relationship" &&
						node[markName]
					) {
						const Mark = renderers.inline[markName];
						child = <Mark>{child}</Mark>;
					}
				});

				return child;
			}
					

			const children = node.children.map((x, i) => ( <block block={x} key={i} /> ));
			switch (node.type) {
				case "blockquote": {
					return <blockquote>{children}</blockquote>;
				}
				case "paragraph": {
					return (
						<p
							class={node.textAlign}
						>{children}</p>
					);
				}
				case "code": {
					if (
						node.children.length === 1 &&
						node.children[0] &&
						typeof node.children[0].text === "string"
					) {
						return (
							<pre>{node.children[0].text}</pre>
						);
					}
					break;
				}
				case "layout": {
					const layout = node.layout
					if (layout === undefined || children === undefined) {
						return <div />;
					}
					return (
						<div
							style={{
								display: "grid",
								gridTemplateColumns: layout.map((x) => `${x}fr`).join(" "),
							}}
						>
							{children.map((element, i) => (
								<div key={i}>{element}</div>
							))}
						</div>
					);
				}
				case "divider": {
					return <hr />;
				}
				case "heading": {
					let Heading = `h${node.level}`;
					return <Heading style={ node.textAlign }>{ children }</Heading>
				}
				case "component-block": {
					const Comp = componentBlocks[node.component];
					if (Comp) {
						const props = createComponentBlockProps(node, children);
						return (
							<div>
								<Comp {...props} />
							</div>
						);
					}
					break;
				}
				case "ordered-list":
				case "unordered-list": {
					const List = node.type === "ordered-list" ? "ol" : "ul";
					if (children === undefined) {
						return <List />;
					}
					return (
						<List>
							{children.map((x, i) => (
								<li key={i}>{x}</li>
							))}
						</List>
					);
				}
				case "relationship": {
					const data = node.data;
					return (<span>{data?.label || data?.id}</span>);
				}
				case "link": {
					return (
						<renderers.inline.link href={node.href}>
							{children}
						</renderers.inline.link>
					);
				}
			}
			return <Fragment>{children}</Fragment>;
		},
	};

export default {
	props: {
		document: {
			type: Array,
			required: true,
		}
	},
	components: {
		block, Fragment
	},
	mount: function() {

	},
	render: function(h) {
		const nodes = []
		this.document.forEach((node, index) => {
			nodes.push(<block block={node} key={index} />)
		});

		return <Fragment>{nodes}</Fragment>
	}
};
</script>