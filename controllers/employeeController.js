const Employee = require('../models/Employee')

const createEmployee = async (req, res) => {
  const { firstname, department } = req.body
  if (!firstname || !department) return res.status(401).json({ "Message": "Fields cannot be empty" })
  try {
    const createEmployee = await Employee.create({
      "firstname": firstname,
      "department": department
    })
    res.status(201).json({ "Message": `${createEmployee.firstname} Employee Created` })
  } catch (error) {
    res.status(500).json({ "Error": `${error.message}` })
  }
}

const getAllEmployee = async (req, res) => {
  try {
    const employees = await Employee.find()
    res.status(200).json(employees)
  } catch (error) {
    res.status(500).json({ "Error": `${error.message}` })
  }
}

const getEmployee = async (req, res) => {
  const { id } = req.params
  try {
    const foundEmployee = await Employee.findOne({ _id: id }).exec()
    if (foundEmployee) {
      console.log(foundEmployee)
      res.status(200).json(foundEmployee)
    } else {
      res.status(302).json({ "Message": "User not found" })
    }
  } catch (error) {
    res.status(500).json({ "Error": `${error.message}` })
  }
}

const updateEmployee = async (req, res) => {
  const { id, firstname, department } = req.body
  if (!firstname || !department) return res.status(401).json({ "Message": "Fields cannot be empty" })
  try {
    const foundEmployee = await Employee.findOne({ _id: id }).exec()
    if (firstname) foundEmployee.firstname = firstname
    if (department) foundEmployee.department = department
    const result = await foundEmployee.save()
    res.json(result)

    res.status(201).json({ "Message": "Employee updated" })
  } catch (error) {
    res.status(500).json({ "Error": `${error.message}` })
  }

}

const deleteEmployee = async (req, res) => {
  const { id } = req.body
  try {
    const foundEmployee = await Employee.findOne({ _id: id }).exec()
    if (foundEmployee) {
      await Employee.deleteOne({ _id: id })
      res.status(200).json({ "Message": "Employee deleted successfully" })
    } else {
      res.status(401).json({ "Message": "Employee with Id not found" })
    }
  } catch (error) {
    res.status(500).json({ "Error": `${error.message}` })

  }

}

module.exports = {
  createEmployee,
  getAllEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee
}

