/**
 * @format
 */
import { Navigation } from 'react-native-navigation';
import App from './App';
Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: '#332424'
    },
    topBar: {
      title: {
        color: 'white'
      },
      backButton: {
        color: 'white'
      },
      background: {
        color: '#332424'
      }
    },
    bottomTab: {
      fontSize: 14,
      selectedFontSize: 14
    }
  });
Navigation.registerComponent('App', () => App);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
     root: {
       stack: {
         children: [
          {
             component: {
               name: 'App',
               options: {
                topBar: {
                    visible: false,
                },
                statusBar: {
                  backgroundColor: '#332424',
                  style: 'light'
                }
            },
             }
           }
         ]
       }
     }
  });
});
