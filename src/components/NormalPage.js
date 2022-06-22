function NormalPage({title, body}){
	return <div className="Home-small full-size" >
             <div className="hero-no-car">
               <h1 className="no-transparency">{title}</h1>
               <p>{body}</p>
             </div>
		   </div>
}
export default NormalPage
