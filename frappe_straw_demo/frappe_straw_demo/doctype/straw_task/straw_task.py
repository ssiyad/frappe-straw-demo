# Copyright (c) 2025, Sabu Siyad and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class StrawTask(Document):
	def before_insert(self):
		self.user = frappe.session.user

	@frappe.whitelist()
	def increment_attempt(self):
		self.attempt += 1
		self.save()
		frappe.db.commit()

	@frappe.whitelist()
	def mark_as_done(self):
		self.status = "Done"
		self.save()
		frappe.db.commit()

	@frappe.whitelist()
	def cancel_task(self):
		self.status = "Cancelled"
		self.save()
		frappe.db.commit()

	@frappe.whitelist()
	def update_status(self, status: str):
		self.status = status
		self.save()
		frappe.db.commit()
