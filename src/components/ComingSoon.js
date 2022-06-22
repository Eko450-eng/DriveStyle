import TypeAnimation from 'react-type-animation'

function ComingSoon(){
	return <div className="ComingSoon">
			 <TypeAnimation
               cursor={false}
               sequence={['Noch ein wenig Geduld, bald siehst du hier unsere Seite', 100]}
               wrapper="h1"
             />
		   </div>
}
export default ComingSoon
