function fetchFacebook(url) {
  return fetch(`https://graph.facebook.com/?id=${encodeURIComponent(url)}`)
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return res.json().then(error => ({ error }));
    }).catch(() => ({ error: { message: "Can't connect to FB" }}))
}

function fetchLoveIt(url) {
  return fetch(`http://localhost:9000/api/v1/thank/graph?url=${encodeURIComponent(url)}`)
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return res.json().then(error => ({ error }));
    }).catch(() => ({ error: { message: "Can't connect to LoveIt" } }))
}

/**
 * Gets a social data presentation of the graph
 */
export default function (url) {
  return Promise.all([fetchFacebook(url), fetchLoveIt(url)]).then(([fb, loveIt]) => ({ fb, loveIt }));
}