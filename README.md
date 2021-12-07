# keystone6-documentreader-vue

This is a Vue version of the DocumentReader component for Keystone 6. The version supplied by Keystone is React only so I wrote this version that uses Vue (2, but should work in 3).

## Usage

Install the npm package:

```bash
npm install keystone6-documentreader-vue
```

Then in your Vue component/page:

```js
import DocumentReader from "~/components/KeystoneDocument/Document";

export default {
	components: {
		DocumentReader,
	},
};
```

Then use the component in your Vue template:

```html
<DocumentReader :document="$page.content.document" />
```

Where `document` is a Keystone 6 document object from your GraphQL query.

> All elements are unstyled, it is up to you to apply CSS.

## Development

Bundle with Bili:

```bash
npx bili --bundle-node-modules
```