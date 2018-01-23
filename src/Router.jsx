import React, { Component } from "react";

import getActiveTabContent from "./logic/getActiveTabContent";
import fetchSocial from "./logic/fetchSocial";
import parseMeta from "./logic/parseMeta";

import GeneralInfo from "./ui/GeneralInfo.jsx";
import FacebookInfo from "./ui/FacebookInfo.jsx";
import LoveItInfo from "./ui/LoveItInfo.jsx";

import SocialPanel from "./ui/Navigation.jsx";
import { readMapping } from "./util";

export let OG_MAPPING = {
  title: ["fb.og_object.title", "og.title", "page.title"],
  type: ["fb.og_object.type", "og.type"],
  description: ["fb.og_object.description", "og.description", "page.description"],
  image: {
    url: ["fb.og_object.image.src", "og.image.src", "page.image_src"],
    widthInt: ["fb.og_object.image.width", "og.image.width"],
    heightInt: ["fb.og_object.image.height", "og.image.height"]
  }
};

function toPossibleOG(url, info) {
  let mappedValue = readMapping(info, OG_MAPPING);
  return Object.assign({ url, type: "article"}, mappedValue);
}

export default class Router extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, nav: "loveIt", social: { fb: { count: -1 }, loveIt: { count: -1 } } };

    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.infoScreen = this.infoScreen.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentWillMount() {
    this.handleRefresh();
  }

  handleRefresh() {
    this.setState({ loading: true });
    getActiveTabContent()
      .then(({ data, url }) => {
        return Promise.all([ parseMeta(data), fetchSocial(url) ])
          .then(([pageInfo, social]) => {
            let info = Object.assign({}, social, pageInfo);
            let possible = toPossibleOG(url, info);
            this.setState({ loading: false, pageInfo, social, url, data, possible })
          })
      }).catch((error) => this.setState({ loading: false, error }));
  }

  handleNavigation(nav) {
    this.setState({ nav })
  };

  handleCreate() {
    let req = new Request("http://localhost:9000/api/v1/thank/graph", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.possible)
    });
    return fetch(req).then(() => this.handleRefresh())
  }

  infoScreen() {
    if (this.state.loading) {
      return (
        <div className="has-text-centered">
          <p className="title">Loading ...</p>
        </div>
      )
    }
    switch (this.state.nav) {
      case "info":
        return <GeneralInfo pageInfo={this.state.pageInfo}/>;
      case "fb":
        return <FacebookInfo {... this.state.social.fb}/>;
      case "loveIt":
        return <LoveItInfo {... this.state.social.loveIt} possible={this.state.possible} onCreate={this.handleCreate}/>
    }
  };

  render () {
    return (
      <div>
        <SocialPanel onNav={this.handleNavigation} selected={this.state.nav} onRefresh={this.handleRefresh}/>
        {this.infoScreen()}
      </div>
    )
  }

};
