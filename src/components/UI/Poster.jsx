import "./Poster.css"


const Poster = ({image, rating, title}) => {
    return (
        <div className="card" style={{width: "13rem"}}>
            <img src={image} className="card-img-top" alt="..." />
            <div className="card-body">
                <div>
                    <i className="bi bi-star-fill"></i> 
                    <span>{rating}</span>
                </div>
                <h5 className="card-title">{title}</h5>
                <a href="/" className="btn btn-sm btn-block text-primary">Watch Options</a>
            </div>
      </div>
    )
}

export default Poster