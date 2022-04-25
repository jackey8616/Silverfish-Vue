// src/plugins/fontawesome.ts
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome, faArrowRight, faArrowCircleRight, faLightbulb as fasLightbulb,
  faLink, faInfo, faInfoCircle, faBookOpen, faUser, faChevronDown,
  faColumns,
} from '@fortawesome/free-solid-svg-icons';
import {
  faLightbulb as farLightbulb, faTimesCircle,
} from '@fortawesome/free-regular-svg-icons';

library.add(
  faHome,
  faArrowRight,
  faArrowCircleRight,
  fasLightbulb,
  farLightbulb,
  faLink,
  faInfo,
  faInfoCircle,
  faBookOpen,
  faTimesCircle,
  faUser,
  faChevronDown,
  faColumns,
);
