# Alfresco Hackathon 2019 - hacking ADF project

Minimal ready-to-use Angular CLI project template pre-configured with ADF 3.1.0 components.

This project was generated with yo following [Creating your first ADF application](https://www.alfresco.com/abn/adf/docs/tutorials/creating-your-first-adf-application/)
 

## Configuration

Clone the project, cd into folder and update the Alfresco URL endpoint in the `proxy.conf.js`.

You will have to make some Modeling and you will need the Share interface and the files in the `configurationFiles` folder.
The model used during the Hackathon is exported in the file `DemoModel.zip`. This model has 3 custonm types.
The most important is demo:TFldRules that will hold the configuration for every kind of incomplete docs you have.
The other two models (TFatturaFornitore and TOrigineMerci) are used with the TFldRules.

After you have imported the model (or build your own):
- make a folder
- attach the TFldRules Type to the folder
- edit the properties of the folder:
-- the Name field is up to you
-- in the Configuration field copy the json file `TFattureFornitore`
- add a rule to the folder that for every new file added will specify the type `Fattura Fornitore Demo`

Make a second folder and in the configuration copy the other json file and in the rule specify the type `Origine Merce Demo`

Then you are ready to start:

```sh
npm install
npm start
```
The app will be available at [http://localhost:4200]


