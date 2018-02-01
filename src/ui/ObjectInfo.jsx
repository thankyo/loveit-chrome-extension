import React from "react";

function asString(obj, prefix = "") {
  return Object
    .keys(obj)
    .reduce((agg, field, i) => {
      let fieldVal = obj[field];
      if (fieldVal === undefined) {
        return agg;
      }

      if (Array.isArray(fieldVal)) {
        return agg.concat([
          <dt key={prefix + field}><b>{prefix}{field}</b></dt>,
          <dd key={prefix + field + ":value"}>{fieldVal.join(", ")}</dd>,
        ]);
      } else if (typeof fieldVal === "object") {
        return agg.concat(asString(fieldVal, `${prefix}${field}:`));
      } else if (typeof fieldVal === "string") {
        let shortVal = fieldVal.length > 35 ? fieldVal.substr(0, 32) + "..." : fieldVal;
        if (fieldVal.startsWith("http")) {
          return agg.concat([
            <dt key={prefix + field}><b>{prefix}{field}</b></dt>,
            <dd key={prefix + field + ":value"}><a href={fieldVal} target="_blank">{shortVal}</a></dd>,
          ]);
        }
        return agg.concat([
          <dt key={prefix + field}><b>{prefix}{field}</b></dt>,
          <dd key={prefix + field + ":value"}>{shortVal}</dd>,
        ]);
      } else {
        return agg.concat([
          <dt key={prefix + field}><b>{prefix}{field}</b></dt>,
          <dd key={prefix + field + ":value"}>{fieldVal}</dd>,
        ]);
      }
    }, []);
}

export default function ObjectInfo({ title, obj = {}, children }) {
  return (
    <article className="tile is-child notification">
      <p className="heading">{title}</p>
      <div className="content">
        <dl>
          {asString(obj)}
        </dl>
      </div>
      {children}
    </article>
  )
}