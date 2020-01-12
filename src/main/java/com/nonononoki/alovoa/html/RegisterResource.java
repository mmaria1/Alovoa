package com.nonononoki.alovoa.html;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

import com.nonononoki.alovoa.repo.GenderRepository;
import com.nonononoki.alovoa.repo.UserIntentionRepository;
import com.nonononoki.alovoa.service.CaptchaService;
import com.nonononoki.alovoa.service.RegisterService;

@Controller
public class RegisterResource {

	@Autowired
	private CaptchaService captchaService;
	
	@Autowired
	private RegisterService registerService;
	
	@Autowired
	private GenderRepository genderRepo;
	
	@Autowired
	private UserIntentionRepository userIntentionRepo;
	
	
	@GetMapping("/register")
	public ModelAndView register() {
		ModelAndView mav = new ModelAndView("register");
		mav.addObject("captcha", captchaService.generate());
		mav.addObject("genders", genderRepo.findAll());
		mav.addObject("intentions", userIntentionRepo.findAll());
		return mav;
	}
	
	@GetMapping("/register/confirm/{tokenString}")
	public String registerConfirm(@PathVariable String tokenString) {

		boolean success = registerService.registerConfirm(tokenString);
		if(success) {
			return "redirect:/?registration-confirm-success";
		} else {
			return "redirect:/?registration-confirm-failed";
		}
		
	}
}
