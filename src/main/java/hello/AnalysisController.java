package hello;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.apache.commons.io.IOUtils;

import java.io.File;
import java.util.Scanner;
import java.io.InputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
public class AnalysisController {

//	@Autowired
//	private ResourceLoader resourceLoader;
	@Value("classpath:out.geojson")
	private Resource geoJsonResource;

	/**
	 * @param stateName full name of state (e.g. "New York")
	 * @return GeoJson containing state with district
	**/
	/*@RequestMapping("/loadState")
	public GeoJson displayState(@RequestParam(value="stateName", required=false, defaultValue="New York") String stateName) {
		return new GeoJson(stateName);
	}*/

	@RequestMapping("/loadState")
	@ResponseBody
	public String loadState(@RequestParam(value="stateName", required=false, defaultValue="New York") String stateName) {
		String ret = "";

		try {
			InputStream inputStream  = geoJsonResource.getInputStream();	
			ret = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
			//ret = new Scanner(file).useDelimiter("\\Z").next();
		}
		catch(FileNotFoundException e) {
			System.err.println("File Not Found Exception in AnalysisController loadStateTEST");
			e.printStackTrace();
		}
		catch(IOException e) {
			System.err.println("IOException in AnalysisController loadStateTEST");
			e.printStackTrace();
		}
/*		ApplicationContext context = new ClassPathXmlApplicationContext("files.xml");
		Resource resource = context.getResource("classpath:out.geojson");
		try{
		  InputStream is = resource.getInputStream();
		  BufferedReader br = new BufferedReader(new InputStreamReader(is));

		  String line;
		  while ((line = br.readLine()) != null) {
		     System.out.println(line);
		  }
		  br.close();

		}catch(IOException e){
			e.printStackTrace();
		}*/

/*		ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
		final Resource fileResource = resourceLoader.getResource("classpath:out.geojson");
		try {
			File file = fileResource.getFile();	
			ret = new Scanner(file).useDelimiter("\\Z").next();
		}
		catch(FileNotFoundException e) {
			System.err.println("File Not Found Exception in AnalysisController loadStateTEST");
			e.printStackTrace();
		}
		catch(IOException e) {
			System.err.println("IOException in AnalysisController loadStateTEST");
			e.printStackTrace();
		}*/
		/*try {
			Resource geoJson = resourceLoader.getResource("classpath:out.geojson");
			InputStream geoJsonStream = geoJson.getInputStream();
			ret = IOUtils.toString(geoJsonStream, StandardCharsets.UTF_8);
		}
		catch(IOException e) {
			System.err.println("IOException in AnalysisController loadStateTEST, reading geoJson with ResourceLoader and InputStream");
			e.printStackTrace();
		}*/
		
/*		String filename = "out.geojson";
		ClassLoader classLoader = getClass().getClassLoader();
		File geoJsonFile = new File(classLoader.getResource(filename).getFile());
		try {
			ret = new Scanner(geoJsonFile).useDelimiter("\\Z").next();
		}
		catch(FileNotFoundException e) {
			System.err.println("File Not Found Exception in AnalysisController loadStateTEST");
			e.printStackTrace();
		}*/
		return ret;
	}

}
