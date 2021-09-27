//styles
import { Wrapper, Content } from './Grid.styles'

// when stuffs are nested inside a component they will be assessible in the children prop

const Grid = ({ header, children }) => {
	return (
	<Wrapper>
		<h1>{header}</h1>
		<Content>{children}</Content>
	</Wrapper>)
}


export default Grid;