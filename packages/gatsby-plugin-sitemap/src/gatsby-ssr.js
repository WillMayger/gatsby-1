import * as React from "react"
import { withPrefix as fallbackWithPrefix, withAssetPrefix } from "gatsby"
import { withoutTrailingSlash } from "./internals"
import { validateOptionsSsr } from "./options-validation"

// TODO: Remnove for v3 - Fix janky path/asset prefixing
const withPrefix = withAssetPrefix || fallbackWithPrefix

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  let { output, createLinkInHead } = validateOptionsSsr(pluginOptions)

  if (!createLinkInHead) {
    return
  }

  setHeadComponents([
    <link
      key={`gatsby-plugin-sitemap`}
      rel="sitemap"
      type="application/xml"
      href={withPrefix(withoutTrailingSlash(output) + `/sitemap-index.xml`)}
    />,
  ])
}
