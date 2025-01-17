/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/i18n/i18n.config';
import { enableScreens } from 'react-native-screens';

enableScreens(); 



AppRegistry.registerComponent(appName, () => App);
