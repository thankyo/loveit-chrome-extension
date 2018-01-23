import X2JS from 'x2js';

const CONVERTER = new X2JS({ escapeMode: false });

function normalizeMeta(meta = []) {
  return meta
    .map(({ _content, _property, _name, _value }) => {
      let field = _property ? _property : _name;
      let value = _content ? _content: _value;

      if (field === "og:image") {
        field = "og:image:src";
      }

      if (field === "twitter:image") {
        field = "twitter:image:src";
      }

      if (field === "vk:image") {
        field = "vk:image:src";
      }

      if (field && field.startsWith("mrc__share_")) {
        field = `mrc:${field.substr(11)}`;
      }

      return { field, value }
    })
    .filter(({ value }) => value && value.trim() !== "")
    .filter(({ field }) => field && field.trim() !== "");
}

function readPage({ title, meta = [], link = [] }) {

  let { value: description } = meta.find(({ field }) => field === 'description') || {};
  let { _href: canonical } = link.find(({ _rel }) => _rel === "canonical") || {};
  let { _href: image_src } = link.find(({ _rel }) => _rel === "image_src") || {};

  return { title, description, canonical, image_src };
}

function setVal(field, val, obj) {
  let separator = field.indexOf(":");
  if (separator === -1) {
    obj[field] = val;
  } else {
    let parent = field.substr(0, separator);
    if (!obj[parent]) {
      obj[parent] = {};
    }
    setVal(field.substr(separator + 1), val, obj[parent]);
  }
}

function parse(headContent) {
  let { head = { meta: [], link: [] } }  = CONVERTER.xml2js(headContent) || {};

  head.meta = normalizeMeta(head.meta);
  head.title = head.title && typeof head.title === "object" ? head.title.__text : head.title;

  let metaObj = head.meta
    .reduce((metaObj, { field, value }) => {
      if (field) {
        setVal(field, value, metaObj);
      } else {
        console.error(`Can't read ${field} ${value}`)
      }
      return metaObj;
    }, {});

  let page = readPage(head);

  return Object.assign(metaObj, { page });
}

export default function(sourceText) {
  return new Promise((resolve) => resolve(parse(sourceText)));
}