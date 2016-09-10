'use babel';

import AndrewAdayWordCountView from './andrew-aday-word-count-view';
import { CompositeDisposable } from 'atom';

export default {

  andrewAdayWordCountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.andrewAdayWordCountView = new AndrewAdayWordCountView(state.andrewAdayWordCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.andrewAdayWordCountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'andrew-aday-word-count:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.andrewAdayWordCountView.destroy();
  },

  serialize() {
    return {
      andrewAdayWordCountViewState: this.andrewAdayWordCountView.serialize()
    };
  },

  toggle() {
    console.log('AndrewAdayWordCount was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
