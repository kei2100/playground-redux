/*
 * It's very important that the reducer stays pure. Things you should never do inside a reducer:
 * - Mutate its arguments;
 * - Perform side effects like API calls and routing transitions;
 * - Call non-pure functions, e.g. Date.now() or Math.random().
 */
/*
 * Given the same arguments, it should calculate the next state and return it.
 * No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */

import { combineReducers } from 'redux';
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions';

// Object destructuring
// e.g
// var o = {p: 42, q: true};
// var {p, q} = o;
//
// console.log(p); // 42
// console.log(q); // true
//
// that is to say,
// SHOW_ALL = VisibilityFilters.SHOW_ALL
const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return {...todo, completed: !todo.completed };
        }
        return todo;
      });
    default:
      return state;
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
});

export default todoApp;

// Note that this is equivalent to:
/*
 * export default function todoApp(state = {}, action) {
 *   return {
 *     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
 *     todos: todos(state.todos, action)
 *   };
 * }
 */