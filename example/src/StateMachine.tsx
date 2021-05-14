import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Rive, { RiveRef, Fit, Alignment } from 'rive-react-native';

export default function StateMachine() {
  const autoplay = false;
  const [isPlaying, setPlaying] = React.useState(autoplay);
  const [fit, setFit] = React.useState(Fit.Cover);
  const [alignment, setAlignment] = React.useState(Alignment.TopCenter);

  const riveRef = React.useRef<RiveRef>(null);

  const toggleAnimation = () => {
    isPlaying
      ? riveRef.current?.pause()
      : riveRef.current?.play(["Designer's Test"], undefined, undefined, true);
    setPlaying((prev) => !prev);
  };

  const fireStateMachineTrigger = () => {
    riveRef.current?.fireState('Swipe to delete', 'Trigger Delete');
  };

  const applyThreshold = () => {
    riveRef.current?.setInputState('Swipe to delete', 'Swipe Threshold', 50);
  };

  const stopAnimation = () => {
    riveRef.current?.stop();
    setPlaying(false);
  };

  const resetAnimation = () => {
    riveRef.current?.reset();
  };

  const setLevel = (n: number) => {
    riveRef.current?.setInputState("Designer's Test", 'Level', n);
  };

  return (
    <>
      <Rive
        ref={riveRef}
        alignment={alignment}
        autoplay={autoplay}
        onPlay={(animationName, isStateMachine) => {
          console.log('played animation name :', animationName, isStateMachine);
        }}
        onPause={(animationName, isStateMachine) => {
          console.log('paused animation name :', animationName, isStateMachine);
        }}
        onStop={(animationName, isStateMachine) => {
          console.log(
            'stopped animation name :',
            animationName,
            isStateMachine
          );
        }}
        onLoopEnd={(animationName, isStateMachine) => {
          console.log(
            'loop ended animation name :',
            animationName,
            isStateMachine
          );
        }}
        onStateChanged={(layerState) => {
          console.log('state changed', layerState);
        }}
        style={styles.box}
        fit={fit}
        stateMachineName="Designer's Test"
        resourceName={'skills'}
      />
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setLevel(0);
          }}
        >
          <Text style={styles.buttonText}>Set level 0</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={toggleAnimation}>
          <Text style={styles.buttonText}>{isPlaying ? 'PAUSE' : 'PLAY'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={resetAnimation}>
          <Text style={styles.buttonText}>{'RESET'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={fireStateMachineTrigger}
        >
          <Text style={styles.buttonText}>Trigger</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={applyThreshold}>
          <Text style={styles.buttonText}>Apply threshold</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setFit((fitInner) =>
              fitInner === Fit.Contain ? Fit.ScaleDown : Fit.Contain
            )
          }
        >
          <Text style={styles.buttonText}>{'CHANGE FIT'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setAlignment((fitInner) =>
              fitInner === Alignment.TopCenter
                ? Alignment.BottomCenter
                : Alignment.TopCenter
            )
          }
        >
          <Text style={styles.buttonText}>{'CHANGE ALIGNMENT'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={stopAnimation}>
          <Text style={styles.buttonText}>{'STOP'}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  box: {
    width: '100%',
    height: 500,
    marginVertical: 20,
  },
  button: {
    height: 40,
    margin: 10,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    paddingLeft: 5,
    paddingRight: 5,
  },
});