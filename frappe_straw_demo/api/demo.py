import frappe


@frappe.whitelist(allow_guest=True)
def hello_world():
	return "Hello World"
