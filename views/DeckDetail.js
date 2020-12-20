import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button as PaperButton, Colors } from "react-native-paper";
import Main from "../components/Main";
import TextLabel from "../components/TextLabel";
import { connect } from "react-redux";
import { handleDeleteDeck } from "../store/actions/decks";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";

class DeckDetail extends React.Component {
  // static navigationOptions = ({ navigation }) => {
  //   const { title } = navigation.state.params;
  // };

  onAddCardPress(id) {
    this.props.navigation.navigate("AddCard", {
      deckId: id,
    });
  }

  onStartQuizPress(id) {
    this.props.navigation.navigate("Quiz", {
      deckId: id,
    });
  }

  onDeleteDeckPress(id) {
    this.props.deleteDeck(id);
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    if (!nextProps.deck) {
      this.props.navigation.goBack();
    }
  }

  render() {
    const { deck } = this.props;
    if (deck) {
      return (
        <Main>
          <View style={styles.container}>
            <TextLabel style={styles.deckTitle}>{deck.title}</TextLabel>
            <Paragraph style={styles.deckCardCount}>
              {deck.questions.length} cards
            </Paragraph>
            <Button
              mode="contained"
              disabled={deck.questions.length > 0 ? false : true}
              onPress={() => this.onStartQuizPress(deck.id)}
            >
              Start Quiz
            </Button>

            <Button
              mode="outlined"
              onPress={() => this.onAddCardPress(deck.id)}
            >
              Add New Card
            </Button>

            <PaperButton
              style={styles.buttonDeleteDeck}
              labelStyle={styles.buttonDeleteDeckLabel}
              mode="text"
              onPress={() => this.onDeleteDeckPress(deck.id)}
            >
              Delete Deck
            </PaperButton>
          </View>
        </Main>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDeleteDeckLabel: {
    color: Colors.red500,
    textTransform: "none",
  },
});

function mapStateToProps({ decks }, props) {
  debugger;
  const { deckId } = props.route.params;
  return {
    deck: decks[deckId],
  };
}

function mapDispatchToProps(dispatch) {
  debugger;
  return {
    deleteDeck: (deckId) => {
      dispatch(handleDeleteDeck(deckId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);