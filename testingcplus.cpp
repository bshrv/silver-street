#include <iostream>
#include <cstring>

using namespace std;

int main () {

    

    string choice {};

    cout << "Decode or Encode? ";
    cin >> choice;

    if (choice != "decode" && choice != "Decode" && choice != "encode" && choice != "Encode") {
        cout << endl << "________________\n" << "Invalid choice";
        return 0;
    }

    string alphabet {"abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVXYZ"};

    string cypher {"TYUIOPQWERGHJKLASDFBNMZXVCpoiuytrewqlkjhgfdsaamnbvcxz"};

    string input {};

    string secret {};

    if (choice == "encode" || choice == "Encode") {
        // Clear previous input
        cin.ignore();

        cout << endl << "-----------------------" << endl << "Input to be encoded: ";
        getline(cin, input);

        cout << endl << "Your input: " << input;

        cout << endl << "-----------------------" << endl << "Secret key for encoding: ";
        cin >> secret;

        string encoded_input {};

        for (size_t i; i < input.length(); ++i) {
            if (input[i] != ' ')
                encoded_input += cypher.at(cypher.find(input[i]));
                cout << ""
            else
                encoded_input += ' ';
        }
            

        cout << endl << "-------------------------" << endl << "Encoded message: " << encoded_input;
    }

    
    

}
