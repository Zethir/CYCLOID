import Vuex from 'vuex';
import { mutations, state, actions } from '@/store/index'

describe('mutations', () => {
  let fruits

  beforeEach(() => {
    fruits = [{ name: 'Kiwi'}]
  })

  test('"SAVE_FRUITS" saves fruits in "state.fruits"', () => {
    mutations.SAVE_FRUITS(state, fruits)
    expect(state.fruits).not.toEqual([])
    expect(state.fruits[0].name).toBe('Kiwi')
  })

  test('"DELETE_FRUIT" deletes a fruit from "state.fruits"', () => {
    mutations.DELETE_FRUIT(state, 0)
    expect(state.fruits).toEqual([])
  })

  test('"ADD_FRUIT" adds new fruit to "state.fruits"', () => {
    mutations.ADD_FRUIT(state, fruits[0])
    expect(state.fruits).not.toEqual([])
    expect(state.fruits[0].name).toBe('Kiwi')
  })

  test('"SET_FRUIT" to set a new fruit to "state.fruit"', () => {
    mutations.SET_FRUIT(state, fruits[0])
    expect(state.fruit).not.toEqual({})
    expect(state.fruit.name).toBe('Kiwi')
  })
})

describe('actions', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      state,
      mutations,
      actions,
    })
  })

  it('calls the api, parse the data and commit the result', () => {
    return store.dispatch('fetchFruits')
      .then(() => {
        expect(store.state.fruits[0]).toHaveProperty('name')
        expect(store.state.fruits[0]).toHaveProperty('isFruit')
        expect(store.state.fruits[0]).toHaveProperty('price')
        expect(store.state.fruits[0]).toHaveProperty('expires')
        expect(store.state.fruits[0]).toHaveProperty('taste')
        expect(store.state.fruits[0]).toHaveProperty('color')
        expect(store.state.fruits[0]).toHaveProperty('description')
        expect(store.state.fruits[0].isFruit).toBeTruthy()
      })
  })
})
