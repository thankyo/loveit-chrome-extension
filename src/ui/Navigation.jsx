import React from "react";

function TileLink(props) {
  let { name, selected, onNav } = props;
  return (
    <article className={`tile is-child notification ${selected === name && "is-info"}`} onClick={() => onNav(name)}>
      <div className="content has-text-centered is-small">
        {props.children}
      </div>
    </article>
  )
}

function TilesNavigation({ onNav, selected, onRefresh }) {
  return (
    <div className="tile is-ancestor">
      <div className="tile is-horizontal is-12">
        <div className="tile">
          <div className="tile is-parent is-horizontal">
            <TileLink name={"info"} selected={selected} onNav={onNav}>
              <p className="title is-6">Info</p>
            </TileLink>
            <TileLink name={"fb"} selected={selected} onNav={onNav}>
              <p className="title is-6">FB</p>
            </TileLink>
            <TileLink name={"loveIt"} selected={selected} onNav={onNav}>
              <p className="title is-6">Love It</p>
            </TileLink>
            <article className={`tile is-child notification`} onClick={onRefresh}>
              <div className="content has-text-centered is-small">
                <p className="title is-7">Refresh</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TilesNavigation;