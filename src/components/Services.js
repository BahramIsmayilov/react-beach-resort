import React, { Component } from "react";
import Title from "./Title";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: "free coctails",
        info:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Veniam, temporibus"
      },
      {
        icon: <FaHiking />,
        title: "endless hiking",
        info:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Veniam, temporibus"
      },
      {
        icon: <FaShuttleVan />,
        title: "free shuttle",
        info:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Veniam, temporibus"
      },
      {
        icon: <FaBeer />,
        title: "strongest beer",
        info:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Veniam, temporibus"
      }
    ]
  };
  render() {
    return (
      <section className="services">
        <Title title="services" />
        <div className="services-center">
          {this.state.services.map((service, index) => {
            return (
              <article key={index} className="service">
                <span>{service.icon}</span>
                <h6>{service.title}</h6>
                <p> {service.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}
