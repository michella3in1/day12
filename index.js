const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.static("src/assets"));

app.use(express.urlencoded({ extended:false }));

//fake data
const dataProject = [
    {
        title: "The International 2023",
        content: "The International 2023 is the concluding tournament of the current season of Dota Pro Circuit and the twelfth annual edition of The International which will take place at Seattle, Washington.",
        author: "LiquidPedia",
        postedAt: new Date(),
    },
    {
        title: "EG WIN 2023 VCT World Champions",
        content: "Org pada malding di tbag",
        author: "LiquidPedia",
        postedAt: new Date(),
    },
]

//get & post

app.get("/", home);
app.get("/contact-me", contactMe);
app.get("/project-content/:id", projectContent);
app.get("/project", formProject);
app.get("/edit-project/:id", editProject);
app.get("/delete-project/:id", deleteProject);

app.post("/project", addProject);
app.post("/edit-project/:id", updateProject)

function updateProject(req,res) {
    const {id} = req.params;
    const {title, content} = req.body;
    dataProject[id].title =title;
    dataProject[id].content =content;

    res.redirect("/");
}


app.listen(PORT,()=>{
    console.log(`server runnning on port ${PORT}`);
});

module.exports = app;


//idx

function home(req, res) {
    res.render("index", {dataProject});
}

//project

function formProject(req, res) {
    res.render("project");
}
function addProject(req, res) {
    const {title, content } = req.body;

    const data = {
        title,
        content,
        image: "images/monja.png",
        postedAt: new Date(),

};
    dataProject.push(data);

    res.redirect("/");

}

function contactMe(req, res) {
    res.render("contact-me");
}

function projectContent(req, res) {
    const { id } = req.params;

    response.render('project-content', {project: dataProject[id]})
}

function editProject(req, res) {
    const { id } = req.params;
    console.log(dataProject[id]);
    res.render("edit-project", {project: dataProject[id],id });
}

function deleteProject(req, res) {
    const { id } = req.params;

    dataProject.splice(id, 1);
    res.redirect("/");
}

//function updateProject(req, res) {

//   const { title, content } = req.body;
//   const id = req.params; 
//   const data = {
//     title,
//     content,
//     image: "images/bkura.png",
//     postedAt: new Date(),
//   };
//   console.log(data);
//  
    
//   dataProject.push(id, 1, data);
//   res.redirect("/");
 // }
    
// function updateProject(req, res) {
//   const { title, content} = req.body;
//   const { id } = req.params;
    
// 	res.redirect("/");
// }
    
// arr.push()
// const num = 9
// const arr = [4, 6, 2, 3];
    
// arr.push(num);
// console.log(arr);
    