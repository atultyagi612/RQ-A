import React,{useEffect} from 'react'
import './error.css'
import {useNavigate } from "react-router-dom";
const Errorpage = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        const gsTitle = {
            init() {
                this._root = document.querySelector( "#Titletmp" );
                this._titles = this._root.querySelectorAll( ".Title-title" );
                this._frame = this._frame.bind( this );
                this.setTexts( [
                    "Whoops!",
                    "W̶h̶o̶o̶p̶s̶!̶",
                    "WHOOpS×💀",
                    "Wh̶o̵o̸p̵s!",
                    "×XERROR",
                    "!spoohW",
                    
                ] );
            },
            on() {
                if ( !this._frameId ) {
                    this._frame();
                }
            },
            off() {
                clearTimeout( this._frameId );
                this._textContent( this._text );
                delete this._frameId;
            },
            setTexts( [ text, ...alt ] ) {
                this._text = text;
                this._textAlt = alt;
            },
        
            // private:
            _text: "",
            _textAlt: [],
            _rand( n ) {
                return Math.random() * n | 0;
            },
            _textContent( txt ) {
                this._titles.forEach( el => el.textContent = txt );
            },
            _frame() {
                const txt = Array.from( this._text );
        
                for ( let i = 0; i < 6; ++i ) {
                    const ind = this._rand( this._text.length );
        
                    txt[ ind ] = this._textAlt[ this._rand( this._textAlt.length ) ][ ind ];
                }
                this._textContent( txt.join( "" ) );
                this._root.classList.add( "Title-glitch" );
                setTimeout( () => {
                    this._textContent( this._text );
                    this._root.classList.remove( "Title-glitch" );
                }, 50 + Math.random() * 300 );
                this._frameId = setTimeout( this._frame, 250 + Math.random() * 500 );
            },
        };
        gsTitle.init();
        gsTitle.on();
        
    },[])
  return (
    <section className="home-section">
    <div className="home-content"  >
      <span className="text" style={{paddingLeft:'30px'}} onClick={()=>{navigate('/app')}}><a href="#!" className="underlinetitle">R Q - A</a></span>
    </div>
    <div id='appcontainer'>
    <div class="errorcontainer">
  <div class="boo-wrapper">
    <div class="boo">
      <div class="face"></div>
    </div>
    <div class="shadow"></div>
<div style={{display: "inline-block"}}>
<div id="Titletmp">
        <div class="Title-title"> </div>
        <div class="Title-title Title-color Title-a"> </div>
        <div class="Title-title Title-color Title-b"> </div>
    </div>
  </div>
    <p>
      We couldn't find the page you
      <br />
      were looking for.
      <br/><br/>
      <a style={{display: "inline-block" ,  border:"0px"}} onClick={()=>{navigate('/app')}} href='#!' ><div class="type">
      click here to go home
  </div></a>
    </p>
  </div>
</div>
    </div>
  </section>
  )
}

export default Errorpage