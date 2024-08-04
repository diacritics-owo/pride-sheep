package diacritics.owo;

import net.fabricmc.api.ModInitializer;
import net.minecraft.util.Identifier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PrideSheep implements ModInitializer {
	public static final String MOD_ID = "pride-sheep";
	public static final Logger LOGGER = LoggerFactory.getLogger(MOD_ID);

	@Override
	public void onInitialize() {
		LOGGER.info("hello from pride sheep <3");
	}

	public static Identifier identifier(String path) {
		return Identifier.of(MOD_ID, path);
	}
}
