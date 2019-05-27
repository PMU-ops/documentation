import React, { useState } from "react"
import { StaticQuery, graphql } from "gatsby"

const Commands = ({ data }) => {
  const [search, setSearch] = useState("")

  return (
    <div className="container col-md-12">
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-addon">
            <i className="fa fa-search" />
          </div>
          <input
            type="text"
            id="command-search"
            className="form-control"
            placeholder="Search Terminus Commands"
            onChange={e => setSearch(e.target.value)}
            value={search}
          />
          <div
            style={{ background: "#fff; cursor:pointer" }}
            className="input-group-addon"
            id="clear-filter"
            onClick={e => setSearch("")}
          >
            <span className="fa fa-times" />
          </div>
        </div>
      </div>

      <table className="table table-commands table-responsive table-bordered table-striped">
        <thead>
          <tr>
            <th>Command</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          {data.dataJson.commands
            .filter(command => {
              return command.name.indexOf(search) >= 0
            })
            .map((command, i) => {
              return (
                <tr key={i}>
                  <td>
                    <strong className="command-name">{command.name}</strong>
                    <br />
                    <small>{command.description}</small>
                  </td>
                  <td>
                    <li className="terminus-usage">
                      <span style={{ whiteSpace: "pre-line" }}>
                        <small />
                        <br />
                        <small>{command.usage[0]}</small>
                      </span>
                    </li>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        dataJson {
          commands {
            name
            description
            usage
          }
        }
      }
    `}
    render={data => <Commands data={data} {...props} />}
  />
)
