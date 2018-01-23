import selectn from "selectn";

function setField(field, val, obj) {
  if (field.endsWith("Int")) {
    obj[field] = parseInt(val);
  } else {
    obj[field] = val;
  }
}

export function readMapping(obj, mapping) {
  return Object
    .keys(mapping)
    .reduce((agg, field) => {
      let fieldMapping = mapping[field];
      if (Array.isArray(fieldMapping)) {
        let fieldValues = fieldMapping.map(path => selectn(path, obj)).filter(val => val !== undefined && val !== "");

        if (fieldValues.length > 0) {
          setField(field, fieldValues[0], agg);
        }
      } else {
        let fieldValue = readMapping(obj, fieldMapping);

        if (Object.keys(fieldValue).length !== 0) {
          setField(field, fieldValue, agg);
        }
      }
      return agg;
    }, {});
}
