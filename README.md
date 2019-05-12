# Alfresco Hackathon 2019 - hacking ADF project

Minimal ready-to-use Angular CLI project template pre-configured with ADF 3.1.0 components.

This project was generated with yo following [Creating your first ADF application](https://www.alfresco.com/abn/adf/docs/tutorials/creating-your-first-adf-application/).

This project was created during the [Alfresco Spring Hackathon 2019](https://community.alfresco.com/docs/DOC-8142-global-virtual-hack-a-thon-spring-2019#jive_content_id_Facilitating_Content_Ingestion)

## The project: Facilitating Content Ingestion
We want to build a dynamic interface for facilitating metadata typing. 

You can have many content sources for Alfresco and for some of them you just can't extract metadata but you need a human type it down.

To minimize the user clicks have built some folder, in every folder there is:
- a rule that Change the type of content added 
- a configuration that permit to specify:
  - when metadata must be completed (i.e. a query)
  - what metadata the person need to complete (possibly a subset of all the content metadata)

During the Hackathon we have built two components. The first one shows the rules defined on the left and a grid of metadata. Once you click on one row of the grid, the second component shows the content preview and the card to insert metadata.

The project is not perfect, so don't use it in a production environment.

This is a snapshot of the first component
![First component](/img/one.png)

This is a snapshot of the second component
![Second component](/img/two.png)


### Configuration

Clone the project, cd into folder and update the Alfresco URL endpoint in the `proxy.conf.js`.

You will have to make some Modeling and you will need the Share interface and the files in the `configurationFiles` folder.
The model used during the Hackathon is exported in the file `DemoModel.zip`. This model has 3 custonm types.
The most important is demo:TFldRules that will hold the configuration for every kind of incomplete docs you have.
The other two models (TFatturaFornitore and TOrigineMerci) are used with the TFldRules.

After you have imported the model (or build your own):
- make a folder
- attach the TFldRules Type to the folder
- edit the properties of the folder:
  - the Name field is up to you
  - in the Configuration field copy the json file `TFattureFornitore`
- add a rule to the folder that for every new file added will specify the type `Fattura Fornitore Demo`

Make a second folder and in the configuration copy the other json file and in the rule specify the type `Origine Merce Demo`

Then you are ready to start:

```sh
npm install
npm start
```
The app will be available at [http://localhost:4200](http://localhost:4200)


