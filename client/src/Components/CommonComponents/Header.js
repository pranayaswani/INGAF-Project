function Header(props){
    return(
        <div class="ui blue inverted segment mt-2">
        <h1 class="ui horizontal blue inverted divider">
        {props.caption}
        </h1>
    </div>
    )
}
export default Header;
