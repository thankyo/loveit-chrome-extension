import React from "react";
import ObjectInfo from "./ObjectInfo.jsx";
import { readMapping } from "../util";

function CardImage({ image }) {
  return (
    <div className="card-image">
      <figure className="image">
        <img src={image}/>
      </figure>
    </div>
  )
}

const VISUAL_MAPPING = {
  title: [ 'og.title', 'page.title' ],
  description: [ 'og.description', 'page.description' ],
  image: [ 'og.image.src', 'page.image_src' ]
};

function Visual({ pageInfo }) {
  let { description, title, image } = readMapping(pageInfo, VISUAL_MAPPING);

  return (
    <article className="card is-primary">
      {image && <CardImage image={image}/>}
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{title}</p>
          </div>
        </div>

        <div className="content">
          {description}
        </div>
      </div>
    </article>
  );
}


export default function ({ pageInfo }) {
  return (
    <div className="tile is-ancestor">
      <div className="tile is-vertical">
        <div className="tile">
          <div className="tile is-parent is-vertical">
            <Visual pageInfo={pageInfo}/>
          </div>
        </div>
      </div>
      <div className="tile is-vertical">
        <div className="tile">
          <div className="tile is-parent is-vertical">
            <ObjectInfo title="meta" obj={pageInfo}/>
          </div>
        </div>
      </div>
    </div>
  );
}