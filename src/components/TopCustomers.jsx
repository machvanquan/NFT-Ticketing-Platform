import React from 'react'

function TopCustomers() {
  return (
    <>
      <section className="section hero" aria-label="home">
        <div className="container">
          <h1 className="headline-lg hero-title">
            <span className="span">NFTick</span>{" "}Top Customers
          </h1>
        </div>
      </section>
      
      <section>
        <div className="container">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th className="label-control">#</th>
                <th className="label-control">Photo</th>
                <th className="label-control">Fullname</th>
                <th className="label-control">Email</th>
                <th className="label-control">Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="label-control">1</td>
                <td className="label-control">Mark</td>
                <td className="label-control">Otto</td>
                <td className="label-control">@mdo</td>
                <td className="label-control">10</td>
              </tr>
              <tr>
                <td className="label-control">2</td>
                <td className="label-control">John</td>
                <td className="label-control">Doe</td>
                <td className="label-control">@johndoe</td>
                <td className="label-control">15</td>
              </tr>
              <tr>
                <td className="label-control">3</td>
                <td className="label-control">Jane</td>
                <td className="label-control">Smith</td>
                <td className="label-control">@janesmith</td>
                <td className="label-control">8</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default TopCustomers
