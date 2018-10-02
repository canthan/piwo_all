import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './storage.scss';

export class Storage extends React.Component<{}, { items }> {
  constructor(props) {
    super(props)
    this.state = {
      items: Array(4).fill('Item')
    }
    console.log('Storage init');
  };

  renderItem(i) {
    return (
      <Item name={this.state.items[i]} />
    )
  }

  render() {
    var names = this.state.items;
    return (
      <div className="storage row">
        {names.map((name, index) => {
          return this.renderItem(index);
        })}
      </div>
    );
  }
}

export class Item extends React.Component<StorageItem, { buttons }> {

  constructor(props: StorageItem) {
    super(props);
    this.state = {
      buttons: Array(4).fill('button'),
    };
  }

  private handleClick(i) {
    const buttons = this.state.buttons.slice();
    buttons[i] = 'clicked';
    this.setState({ buttons: buttons });
  }

  renderButton(i) {
    return (
      <Button
        name={this.state.buttons[i]}
        onClick={() => this.handleClick(i)}
        clicked={false} />
    )
  }

  render() {
    return (
      <div className="col-md-6 col-xs-12">
        <div className="item">
          <Header style="Styl" number="22" />
          {this.props.name}
          {this.renderButton(0)}
          {this.renderButton(1)}
        </div>
      </div>
    )
  }
}

export interface StorageItem {
  name: string;
}

export interface PropsButton {
  onClick: any;
  name: string;
  clicked: boolean;
}

function Button(props: PropsButton) {
  return (
    <button className="btn btn-primary" onClick={props.onClick}>
      {props.name} {props.clicked}
    </button>
    // <Button bsStyle="primary" onClick={props.onClick}>{props.name} {props.clicked}</Button>
  );
}

function Header(props) {
  return (
    <h2 className="heading">#{props.number} {props.style}</h2>
  );
}

export class Input extends React.Component<{}, {}> {

}

export class Label extends React.Component<{}, {}> {

}

export class Text extends React.Component<{}, {}> {

}


export default Storage
ReactDOM.render(
  <Storage />,
  document.getElementById('root')
)