import { readMapping, OG_MAPPING } from "../src/App.jsx";
import { readJson } from "./util";

test("readMapping afisha", () => {
  let obj = readJson('./cases/afisha_mail_ru.json');
  let expected = readJson('./cases/afisha_mail_ru_og.json');

  let ogMapping = readMapping(obj, OG_MAPPING);
  expect(ogMapping).toEqual(expected);
});

test("readMapping auto", () => {
  let obj = readJson('./cases/auto_mail_ru.json');
  let expected = readJson('./cases/auto_mail_ru_og.json');

  let ogMapping = readMapping(obj, OG_MAPPING);
  expect(ogMapping).toEqual(expected);
});

test("readMapping lenta", () => {
  let obj = readJson('./cases/lenta_ru.json');
  let expected = readJson('./cases/lenta_ru_og.json');

  let ogMapping = readMapping(obj, OG_MAPPING);
  expect(ogMapping).toEqual(expected);
});

