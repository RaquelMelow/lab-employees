const { json } = require('express');
const employeesData = require('../employees.json');

module.exports.getAllEmployees = (req, res) => {
    if (req.query.page) {
        const page = parseInt(req.query.page);
        const perPage = 2;
        const startIndex = perPage * (page - 1);
        const endIndex = startIndex + perPage - 1;

        const paginatedEmployees = employeesData.slice(startIndex, endIndex + 1)

        res.json(paginatedEmployees);
    } else if (req.query.user) {
        const userEmployees = employeesData.filter(employee => employee.privileges === 'user')
        res.json(userEmployees)
    } else if (req.query.badges) {
        const filteredEmployees = employeesData.filter( employee => employee.badges.includes('black'));
        res.json(filteredEmployees)
    } else {
        res.json(employeesData);
    }
}


module.exports.getOldest = (req, res) => {
    const sortedEmployees = employeesData.sort((a, b) => b.age - a.age)
    
    const oldestEmployee = sortedEmployees[0];
    res.json(oldestEmployee);
};

module.exports.doList = (req, res) => {
    const {name, age, phone, privileges, badges, points} = req.body;
    if (name && age && phone && privileges && badges && points) {
    const newEmployee = req.body;
    employeesData.push(newEmployee)

    console.debug(employeesData)
    res.json(employeesData)
    } else {
        res.status(400).json({ code: "bad_request" });
    }
   
}

module.exports.getName = (req, res) => {
    const name = req.params.name.toLowerCase();
    const nameEmployee = employeesData.find(employee => employee.name.toLowerCase() === name);

    if (!nameEmployee) {
        return res.status(404).json({ code: "not_found" });
    }
    res.json(nameEmployee);
};
   

    
