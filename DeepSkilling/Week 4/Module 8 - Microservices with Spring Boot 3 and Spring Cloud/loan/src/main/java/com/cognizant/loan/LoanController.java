package com.cognizant.loan;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoanController {

	@GetMapping("/loans/{number}")
	public Loan getLoanDetails(@PathVariable String number) {

		// Dummy response without any backend connectivity
		Loan loan = new Loan(number, "car", 400000, 3258, 18);
		return loan;
	}

}
