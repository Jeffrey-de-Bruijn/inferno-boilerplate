// @flow
interface Props {
}

// $FlowExpectedError Inferno VNode
export default function Home( props: Props ) {
  return (
    <div id="home">
      home
    </div>
  );
}
