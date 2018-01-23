import React from "react";

import ObjectInfo from "./ObjectInfo.jsx";

function FacebookInfoView({ og_object: { title = "unknown", description = "missing", type = "unknown", updated_time } = {} }) {
  return (
    <article className="tile is-child notification is-primary">
      <p className="title is-4">{title}</p>
      <p className="subtitle is-6">{type}</p>

      <div className="content">
        {description}
      </div>
      <time dateTime={updated_time}/>
    </article>
  )
}

export default function FacebookInfo(props) {
  let { og_object = {}, share = {}, error } = props;
  return (
    <div className="tile is-ancestor">
      <div className="tile is-vertical is-6">
        <div className="tile">
          <div className="tile is-parent is-vertical">
            <FacebookInfoView {...props}/>
            <div className="tile is-child notification"/>
          </div>
        </div>
      </div>
      <div className="tile is-vertical is-6">
        <div className="tile">
          <div className="tile is-parent is-vertical">
            <ObjectInfo title="og_object" obj={og_object}/>
            <ObjectInfo title="share" obj={share}/>
            {error && <ObjectInfo title="error" obj={error}/>}
          </div>
        </div>
      </div>
    </div>
  );
}