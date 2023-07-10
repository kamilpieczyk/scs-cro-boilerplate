import App from './app.jsx'
import { testName, placeAfterSelector } from '../test-config'
import { render, h } from 'preact'
import './styles.scss'


const element = document.createElement('div');
element.setAttribute('id', testName);
const elementAfter = document.querySelector(placeAfterSelector);

if (elementAfter) {
  elementAfter.parentNode.insertBefore(element, elementAfter);
  render(<App />, element);
}