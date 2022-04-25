const {client} = require("../pool");
const { addNewVisitor,listAllVisitors, deleteAllVisitors } = require('../q')

beforeEach( ()=> 
    {spyOn(client,"query").and.callThrough()});
//);


describe("addNewVisitor", () => {
    // beforeEach( ()=> 
    // {spyOn(pool,"query")})
     it("it should be called with the right arguments", () =>{
        // spyOn(client, "query")
         const personnel = {
             name: 'Willy Wonka',
             age: 89,
             date: '1/12/2020',
             time: '12:32',
             assistant: 'Charlie',
             comment: 'Delicious world!'
         }
         addNewVisitor(personnel.name, personnel.age, personnel.date, personnel.time, personnel.assistant, personnel.comment)
         expect(client.query).toHaveBeenCalledOnceWith(`INSERT INTO Visitors(Name, Age, dateOfVisit, timeOfVisit, assistedBy, comments)
         VALUES($1,$2,$3,$4,$5,$6)`, [ 'Willy Wonka', 89, '1/12/2020', '12:32', 'Charlie', 'Delicious world!' ] );
     })
 });

 describe("listallVisitors", () => {
     it("should have been called with the right arguments", () =>{
         listAllVisitors();
         expect(client.query).toHaveBeenCalledOnceWith('SELECT Name, ID FROM Visitors;');
     })
 }) 
 

/*describe("addNewVisitor", () => {
   // beforeEach( ()=> 
   // {spyOn(pool,"query")})
    it("it should be called with the right arguments", () =>{
        spyOn(obj, "addNewVisitor")
        const personnel = {
            name: 'Willy Wonka',
            age: 89,
            date: '1/12/2020',
            time: '12:32',
            assistant: 'Charlie',
            comment: 'Delicious world!'
        }
        obj.addNewVisitor(personnel.name, personnel.age, personnel.date, personnel.time, personnel.assistant, personnel.comment)
        expect(obj.addNewVisitor).toHaveBeenCalledWith(jasmine.any(String),jasmine.any(Number),jasmine.any(String),jasmine.any(String),jasmine.any(String),jasmine.any(String));
    })
});*/

/*describe("node sql", () => {
 //  const { addNewVisitor, viewVisitor, deleteAllVisitors } = require('../q')
    const personnel = {
        name: 'Willy Wonka',
        age: 89,
        date: '21/12/2020',
        time: '12:32',
        assistant: 'Charlie',
        comment: 'Delicious world!'
    }
    it("should save data to database", async (done) => {
        let newVisitor = await addNewVisitor(personnel.name, personnel.age, personnel.date, personnel.time, personnel.assistant, personnel.comment)
        expect(newVisitor[0].fullname).toEqual(personnel.name)
        expect(newVisitor[0].Age).toEqual(personnel.age)
        expect(newVisitor[0].dateOfVisit).toEqual(personnel.date)
        expect(newVisitor[0].timeOfVisit).toEqual(personnel.time)
        expect(newVisitor[0].assistedBy).toEqual(personnel.assistant)
        expect(newVisitor[0].comment).toEqual(personnel.comment)
        done();
    });
    it("should list all visitors names with id", async (done) => {
        await viewVisitor().then(res => {
            const objPersonnel = res.rows
            let id = 0

            expect(objPersonnel[0].fullname).toEqual(personnel.name)
            expect(objPersonnel[0].Age).toEqual(personnel.age)
            expect(objPersonnel[0].dateOfVisit).toEqual(personnel.date)
            expect(objPersonnel[0].timeOfVisit).toEqual(personnel.time)
            expect(objPersonnel[0].assistedBy).toEqual(personnel.assistant)
            expect(objPersonnel[0].comment).toEqual(personnel.comment)

            id = objPersonnel.id;
        });

        done();
    });

    it("should delete visitors", async done => {
        await deleteAllVisitors().then(res => {
            const objPersonnel = res.rows

            expect(objPersonnel[0].fullname).toEqual(personnel.name)
            expect(objPersonnel[0].Age).toEqual(personnel.age)
            expect(objPersonnel[0].dateOfVisit).toEqual(personnel.date)
            expect(objPersonnel[0].timeOfVisit).toEqual(personnel.time)
            expect(objPersonnel[0].assistedBy).toEqual(personnel.assistant)
            expect(objPersonnel[0].comment).toEqual(personnel.comment)
        });

        done();
    });

});*/
