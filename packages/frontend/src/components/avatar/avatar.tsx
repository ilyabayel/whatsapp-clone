import React, {ReactElement} from "react";
import "./avatar.scss";

/**
 * Component for showing user/room avatar.
 *
 * @component
 * @example
 * const src = "https://example.com/some-url/"
 * return <Avatar src="src" />
 */

export function Avatar({src}: {src: string}): ReactElement {
  return <img src={src} alt="avatar" data-test="component-avatar" className="avatar" />;
}
