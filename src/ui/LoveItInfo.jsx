import React, { Component } from "react";
import ObjectInfo from "./ObjectInfo.jsx";

class CreateButton extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: false, isError: false, isSaved: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ isLoading: true });
    this.props
      .onClick()
      .then(() => this.setState({ isLoading: false, isSaved: true }))
      .catch(() => this.setState({ isLoading: false, isError: true }))
  };

  render() {
    let { isLoading, isSaved, isError } = this.state;

    return (
      <button className={`button ${isLoading && "is-loading"} ${isError && "is-warning"} ${isSaved && "is-primary"}`}
              onClick={this.handleClick} disabled={isSaved}>
        Create
      </button>
    );
  }
}

function LoveItOGView({ title = "unknown", description = "missing", type = "unknown", image: { url = "" } = {}, tags }) {
  let style = {
    width: 320,
    height: 320,
    overflow: "hidden"
  };
  return (
    <article className="tile is-child notification">
      <figure className="image" style={style}>
        <img src={url}/>
      </figure>
      <p className="title">{title}</p>
      <p className="subtitle">{type}</p>
      <div className="content">
        {description}
        <div className="tags">
          {tags.map((tag, i) => <span key={i} className="tag is-primary">{tag}</span>)}
        </div>
      </div>
    </article>
  )
}

function AuthorVisual({ firstName = "Unknown", lastName = "Unknown", avatar = "https://bulma.io/images/placeholders/96x96.png", tags = [] }) {
  return (
    <article className="tile is-child notification is-primary">
      <img src={avatar}/>
      <p className="title is-4">{firstName} {lastName}</p>
      <div className="tags is-info">
        {tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
      </div>
    </article>
  )
}

export default function LoveItInfo(props) {
  let { project, ogObj, onCreate, possible, error, tags } = props;
  return (
    <div className="tile is-ancestor">
      <div className="tile is-6 is-vertical is-parent">
        <AuthorVisual {...project}/>
        <LoveItOGView {...ogObj} tags={tags}/>
      </div>
      <div className="tile is-6 is-vertical is-parent">
        <ObjectInfo title="author" obj={project}/>
        <ObjectInfo title="possible" obj={possible}>
          <div className="has-text-centered">
            <CreateButton onClick={onCreate}/>
          </div>
        </ObjectInfo>
        <ObjectInfo title="og_object" obj={ogObj}/>
        {error && <ObjectInfo title="error" obj={error}/>}
      </div>
    </div>
  );
}