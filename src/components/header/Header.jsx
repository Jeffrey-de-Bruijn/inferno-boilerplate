// @flow
interface Props {
}

// $FlowExpectedError Inferno VNode
export default function Header( props: Props ) {
  return (
    <div id="header">
      header
    </div>
  );
}
