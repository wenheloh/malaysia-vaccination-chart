import bodyParser from "body-parser";
import express from "express";
import DataService from "./service/DataService";
import { DataSourceType } from "~/common/customTypings/enums";

const app = express();
app.use(bodyParser.json());

app.get("/data/:typeOfChart", async (req, res) => {
	const dataService = new DataService();
	const data = await dataService.getData(
		(req.params.typeOfChart as unknown) as DataSourceType
	);
	res.json({ data });
});

module.exports = app;
