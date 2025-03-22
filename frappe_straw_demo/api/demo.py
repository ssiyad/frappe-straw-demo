import frappe


@frappe.whitelist(allow_guest=True)
def hello_world():
	frappe.msgprint("Hello, World!", title="Hello, World!", indicator="green")
	return {
		"english": "Hello, World!",
		"malayalam": "ഹലോ വേൾഡ്!",
		"hindi": "हैलो वर्ल्ड!",
		"arabic": "!مرحبا بالعالم",
	}
