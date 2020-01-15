import React from 'react';
import './style.scss';

// speakRefUrl: http://www.grsites.com/archive/sounds/category/27/?offset=0
class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '# Drum Machine',
      display: 'Make Some Beat!',
      nesURL: 'https://nostalgic-css.github.io/NES.css/#',
      reactURL: 'https://zh-hant.reactjs.org/',
      nesColors: { default: '', blue: 'is-primary', red: 'is-error', orange: 'is-warning', green: 'is-success' },
      padList: {
        1: { id: '1', keyCode: 49, audioSrc: 'http://static1.grsites.com/archive/sounds/scifi/scifi025.mp3', content: 'Mothership Launching' },
        2: { id: '2', keyCode: 50, audioSrc: 'http://static1.grsites.com/archive/sounds/scifi/scifi012.mp3', content: 'Hold Your Weapons' },
        3: { id: '3', keyCode: 51, audioSrc: 'http://static1.grsites.com/archive/sounds/scifi/scifi035.mp3', content: 'Alien Onboard' },
        Q: { id: 'Q', keyCode: 81, audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', content: 'Disc ~Oh!' },
        W: { id: 'W', keyCode: 87, audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', content: 'tz!' },
        E: { id: 'E', keyCode: 69, audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3', content: 'STICK' },
        A: { id: 'A', keyCode: 65, audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', content: 'KICK!!' },
        S: { id: 'S', keyCode: 83, audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', content: 'KICK & HAT!' },
        D: { id: 'D', keyCode: 68, audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3', content: 'BREAK' },
        Z: { id: 'Z', keyCode: 90, audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', content: '\'\'CLAP\'\'' },
        X: { id: 'X', keyCode: 88, audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3', content: 'PUNCHY!!!' },
        C: { id: 'C', keyCode: 67, audioSrc: 'http://static1.grsites.com/archive/sounds/quotes/quotes001.mp3', content: '..Speak' }
      }
    }
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 49:
        case 50:
        case 51:
        case 81:
        case 87:
        case 69:
        case 65:
        case 83:
        case 68:
        case 90:
        case 88:
        case 67:
          document.getElementById("drum-pad-" + String.fromCharCode(e.keyCode)).click();
          break;
        default:
          break;
      }
    });
  }
  handleClick(e, clickedProps) {
    this.setState({
      display: clickedProps.padInfo.content
    });
    let sound = document.getElementById(clickedProps.padInfo.id);
    sound.currentTime = 0;
    sound.play();
    sound.onended = () => {
      this.setState({
        display: 'Make Some Beat!'
      });
    };
  }
  render() {
    return (
      <div id="drum-machine" class="nes-container is-dark is-centered with-title">
        <Title title={this.state.title} />
        <Display display={this.state.display} />
        <Pannel nesColors={this.state.nesColors} padList={this.state.padList} handleClick={this.handleClick} />
        <Footer nesURL={this.state.nesURL} reactURL={this.state.reactURL} />
      </div>
    );
  }
}

const Title = (props) => {
  return <p class="title">{props.title}</p>;
}
const Display = (props) => {
  return <p id="display" class="nes-text is-warning">{props.display}</p>;
}
const Footer = (props) => {
  return (<footer>made with <i class="nes-icon is-small star"></i>
    <a id="nes" target="_blank" href={props.nesURL}> NES.css</a>, <a id="react" target="_blank" href={props.reactURL}>React</a></footer>);
}
const Pannel = (props) => {
  return (<div id="pannel">
    <DrumPad color={props.nesColors.orange} padInfo={props.padList['1']} handleClick={props.handleClick} />
    <DrumPad color={props.nesColors.orange} padInfo={props.padList['2']} handleClick={props.handleClick} />
    <DrumPad color={props.nesColors.orange} padInfo={props.padList['3']} handleClick={props.handleClick} />
    <DrumPad color={props.nesColors.blue} padInfo={props.padList.Q} handleClick={props.handleClick} />
    <DrumPad color={props.nesColors.blue} padInfo={props.padList.W} handleClick={props.handleClick} />
    <DrumPad color={props.nesColors.red} padInfo={props.padList.E} handleClick={props.handleClick} />
    <DrumPad color={props.nesColors.default} padInfo={props.padList.A} handleClick={props.handleClick} />
    <DrumPad color={props.nesColors.default} padInfo={props.padList.S} handleClick={props.handleClick} />
    <DrumPad color={props.nesColors.red} padInfo={props.padList.D} handleClick={props.handleClick} />
    <DrumPad color={props.nesColors.green} padInfo={props.padList.Z} handleClick={props.handleClick} />
    <DrumPad color={props.nesColors.default} padInfo={props.padList.X} handleClick={props.handleClick} />
    <DrumPad color={props.nesColors.orange} padInfo={props.padList.C} handleClick={props.handleClick} />
  </div>);
}
const DrumPad = (props) => {
  let classSet = 'drum-pad nes-btn ' + props.color;
  let id = "drum-pad-" + props.padInfo.id;
  return (<button id={id} class={classSet} onClick={(e) => { props.handleClick(e, props) }}>
    <audio src={props.padInfo.audioSrc} class="clip" id={props.padInfo.id}></audio>{props.padInfo.id}
  </button>);
}

export default DrumMachine;
