// @flow
import * as React from 'react';
import Results from 'App/Results';
import SavedProperties from 'App/SavedProperties';
import { StyleSheet, css } from 'aphrodite';

const App = (): React.Node => {
  const [results, setResults] = React.useState([]);
  const [saved, setSaved] = React.useState([]);

  const getData = () => {
    fetch('./data.json',{
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }).then((res) => {
      return res.json();
    }).then((data) => {
      const { results, saved } = data;
      setResults(results);
      setSaved(saved);
    }).catch((err) => {
      console.error(err);
    });
  };

  React.useEffect(() => {
    getData();
  }, []);

  const styles = StyleSheet.create({
    lists: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      '@media only screen and (max-width: 768px)': {
        width: '768px',
      }
    }
  });

  return (
    <div className={css(styles.lists)}>
      <Results results={results} saved={saved} setSaved={setSaved}/>
      <SavedProperties saved={saved} setSaved={setSaved}/>
    </div>
  )
};

export default App;
